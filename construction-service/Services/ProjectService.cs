using AutoMapper;
using construction_service.Data;
using construction_service.DTOs;
using construction_service.Model;
using Microsoft.EntityFrameworkCore;

namespace construction_service.Services;

public class ProjectService : IProjectService
{
    private readonly ConstructionDbContext _db;

    private readonly IMapper _mapper;

    public ProjectService(
        ConstructionDbContext db,
        IMapper mapper
    )
    {
        _db = db;

        _mapper = mapper;
    }

    public async Task<ProjectResponse> Create(
        ProjectRequest request
    )
    {
       var project = new Project
        {
            Name = request.Name,
            ClientId = request.ClientId,
            StartDate = DateTime.SpecifyKind(request.StartDate, DateTimeKind.Utc),
            EndDate = request.EndDate.HasValue
                ? DateTime.SpecifyKind(request.EndDate.Value, DateTimeKind.Utc)
                : null,
            Status = "PLANNED"
        };

        _db.Projects.Add(project);

        await _db.SaveChangesAsync();

        return _mapper.Map<ProjectResponse>(
            project
        );
    }

    public async Task<List<ProjectResponse>>
        GetAll()
    {
        return _mapper.Map<
            List<ProjectResponse>
        >(
            await _db.Projects.ToListAsync()
        );
    }

    public async Task<ProjectResponse?>
        GetById(int id)
    {
        var project =
            await _db.Projects.FindAsync(id);

        return project is null
            ? null
            : _mapper.Map<ProjectResponse>(
                project
            );
    }

    // Your existing Update method
    public async Task<ProjectResponse?>
    UpdateAsync(
        int id,
        ProjectUpdateRequest request
    )
    {
        var project =
            await _db.Projects.FindAsync(id);

        if (project is null)
        {
            return null;
        }

        project.Name = request.Name;

        project.EndDate = request.EndDate;

        project.Status = request.Status;

        await _db.SaveChangesAsync();

        return _mapper.Map<ProjectResponse>(
            project
        );
    }

    public async Task Delete(int id)
    {
        var project =
            await _db.Projects.FindAsync(id);

        if (project is null)
        {
            throw new KeyNotFoundException("Project not found");
        }

        _db.Projects.Remove(project);

        await _db.SaveChangesAsync();
    }


}