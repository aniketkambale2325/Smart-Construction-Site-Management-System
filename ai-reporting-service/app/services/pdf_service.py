import io
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


def generate_repost_pdf(site_id: int, report_type: str, report_data: dict) -> bytes:

    buffer = io.BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    title = Paragraph(
        "<b>Construction Site Report</b>",
        styles["Title"]
    )

    elements.append(title)
    elements.append(Spacer(1, 0.3 * inch))

    data = [
        ["Site ID", str(site_id)],
        ["Site Name", report_data.get("SiteName", f"Site {site_id}")],
        ["Report Type", report_type],
        ["Report Date", report_data.get("reportDate", datetime.now().strftime("%Y-%m-%d"))],
        ["Progress", f"{report_data.get('percentComplete', 0)} %"],
        ["Submitted By", report_data.get("submittedBy", "N/A")],
    ]

    table = Table(data, colWidths=[150, 300])

    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ("BACKGROUND", (0, 0), (0, -1), colors.lightgrey),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    elements.append(table)

    elements.append(Spacer(1, 0.4 * inch))

    elements.append(
        Paragraph("<b>Description</b>", styles["Heading2"])
    )

    elements.append(
        Paragraph(
            report_data.get("description", "No Description"),
            styles["BodyText"],
        )
    )

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf