using AutoMapper;
using construction_service.DTOs;
using construction_service.Model;

namespace construction_service.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Project, ProjectResponse>();
    }
}