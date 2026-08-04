from datetime import date, timedelta
import statistics
from sqlalchemy import text
from sqlalchemy.orm import Session


def _fetch_site_progress_history(db: Session, site_id: int) -> list[dict]:
    """
    Reads this site's actual daily_reports history (owned by the .NET service,
    read-only here) so the prediction is grounded in real recorded progress
    instead of an assumed constant velocity.
    """
    rows = db.execute(
        text("""
            SELECT report_date, percent_complete
            FROM daily_reports
            WHERE site_id = :site_id
            ORDER BY report_date ASC
        """),
        {"site_id": site_id},
    ).fetchall()

    return [{"date": row.report_date, "percent": row.percent_complete} for row in rows]


def predict_delay(db: Session, site_id: int, planned_end_date: date) -> dict:
    """
    Data-driven delay prediction based on THIS site's own history:
      1. Computes actual velocity (percent gained per day) from real reports.
      2. Projects a completion date at that velocity.
      3. Compares it to the planned end date.
      4. Sets the "on track" tolerance from this site's own day-to-day
         variability, rather than one fixed number applied to every project.
    """
    history = _fetch_site_progress_history(db, site_id)

    if len(history) < 2:
        return {
            "status": "insufficient_data",
            "estimatedDelayDays": 0,
            "reason": "Need at least 2 daily reports for this site to compute a real velocity",
        }

    first, last = history[0], history[-1]
    days_span = (last["date"] - first["date"]).days
    percent_gained = last["percent"] - first["percent"]

    if days_span <= 0 or percent_gained <= 0:
        return {
            "status": "insufficient_data",
            "estimatedDelayDays": 0,
            "reason": "No measurable progress recorded yet for this site",
        }

    actual_velocity = percent_gained / days_span  # real percent-per-day, from actual reports

    remaining_percent = max(0, 100 - last["percent"])
    projected_days_to_finish = remaining_percent / actual_velocity
    projected_completion_date = last["date"] + timedelta(days=projected_days_to_finish)

    delay_days = (projected_completion_date - planned_end_date).days

    # Tolerance band comes from this site's own reporting noise: a site whose
    # daily percentage jumps around a lot naturally gets a wider "on track"
    # window than a site that progresses very smoothly — not one fixed number
    # for every project regardless of how it actually behaves.
    daily_deltas = [
        history[i]["percent"] - history[i - 1]["percent"]
        for i in range(1, len(history))
        if (history[i]["date"] - history[i - 1]["date"]).days > 0
    ]
    variability = statistics.pstdev(daily_deltas) if len(daily_deltas) > 1 else 1.0
    tolerance_days = max(1, round(variability))

    if delay_days <= tolerance_days:
        status = "on_track"
    elif delay_days <= tolerance_days * 3:
        status = "slightly_behind"
    else:
        status = "significantly_behind"

    return {
        "status": status,
        "actualVelocityPercentPerDay": round(actual_velocity, 2),
        "toleranceDays": tolerance_days,
        "projectedCompletionDate": projected_completion_date.isoformat(),
        "estimatedDelayDays": delay_days,
    }