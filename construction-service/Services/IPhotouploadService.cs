namespace ConstructionService.Services;

public interface IPhotoUploadService
{
    Task<string> UploadAsync(int siteId, IFormFile file);
}