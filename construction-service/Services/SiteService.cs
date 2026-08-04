using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using Microsoft.EntityFrameworkCore;


namespace construction_service.Services;


public class SiteService : ISiteService
{
    private readonly
        ConstructionDbContext _context;


    public SiteService(
        ConstructionDbContext context
    )
    {
        _context = context;
    }


    public async Task<SiteResponse>
        CreateAsync(
            SiteRequest request
        )
    {
        var projectExists =
            await _context.Projects
                .AnyAsync(
                    p =>
                        p.Id ==
                        request.ProjectId
                );

        if (!projectExists)
        {
            throw new KeyNotFoundException(
                "Project not found"
            );
        }


        var site = new Site
        {
            ProjectId =
                request.ProjectId,

            SiteName =
                request.SiteName,

            Address =
                request.Address,

            SiteEngineerId =
                request.SiteEngineerId
        };


        _context.Sites.Add(site);

        await _context
            .SaveChangesAsync();


        return ToResponse(site);
    }


    public async Task<SiteResponse?>
        GetByIdAsync(
            int id
        )
    {
        var site =
            await _context.Sites
                .FindAsync(id);

        return site is null
            ? null
            : ToResponse(site);
    }


    public async Task<List<SiteResponse>>
        GetByProjectIdAsync(
            int projectId
        )
    {
        var sites =
            await _context.Sites
                .Where(
                    s =>
                        s.ProjectId ==
                        projectId
                )
                .ToListAsync();


        return sites
            .Select(ToResponse)
            .ToList();
    }


    public async Task<SiteResponse?>
        AssignEngineerAsync(
            int siteId,
            int employeeId
        )
    {
        var site =
            await _context.Sites
                .FindAsync(siteId);

        if (site is null)
        {
            return null;
        }


        site.SiteEngineerId =
            employeeId;


        await _context
            .SaveChangesAsync();


        return ToResponse(site);
    }


    private static
        SiteResponse ToResponse(
            Site site
        )
    {
        return new SiteResponse(
            site.Id,
            site.ProjectId,
            site.SiteName,
            site.Address,
            site.SiteEngineerId
        );
    }
}