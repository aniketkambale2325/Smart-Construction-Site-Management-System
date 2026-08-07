using Minio;
using Minio.DataModel.Args;

namespace ConstructionService.Services;

public class PhotoUploadService : IPhotoUploadService
{
    private readonly IMinioClient _minioClient;
    private const string Bucket = "site-photos";

    public PhotoUploadService(IConfiguration config)
    {
        _minioClient = new MinioClient()
            .WithEndpoint(config["Minio:Endpoint"])
            .WithCredentials(config["Minio:AccessKey"], config["Minio:SecretKey"])
            .Build();
    }

    public async Task<string> UploadAsync(int siteId, IFormFile file)
    {
        bool exists = await _minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(Bucket));
        if (!exists)
            await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(Bucket));

        var objectName = $"site-{siteId}/{Guid.NewGuid()}-{file.FileName}";

        using var stream = file.OpenReadStream();
        await _minioClient.PutObjectAsync(new PutObjectArgs()
            .WithBucket(Bucket)
            .WithObject(objectName)
            .WithStreamData(stream)
            .WithObjectSize(stream.Length)
            .WithContentType(file.ContentType));

        return $"http://{Environment.GetEnvironmentVariable("MINIO_PUBLIC_HOST") ?? "localhost:9000"}/{Bucket}/{objectName}";
    }
}