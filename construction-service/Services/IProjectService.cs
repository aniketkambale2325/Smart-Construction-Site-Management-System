using construction_service.DTOs;

namespace construction_service.Services;

public interface IProjectService
{
    Task<ProjectResponse> Create(
        ProjectRequest request
    );

    Task<List<ProjectResponse>> GetAll();

    Task<ProjectResponse?> GetById(
        int id
    );

    Task<ProjectResponse?> UpdateAsync(
        int id,
        ProjectUpdateRequest request
    );

    Task Delete(int id);
}