using System.Text;

using construction_service.Data;
using construction_service.Profiles;
using construction_service.Services;
using ConstructionService.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Database configuration
builder.Services.AddDbContext<ConstructionDbContext>(
    options =>
        options.UseNpgsql(
            builder.Configuration.GetConnectionString(
                "DefaultConnection"
            )
        )
);

// JWT configuration
var jwtSecret =
    builder.Configuration["Jwt:Secret"];

var key =
    Encoding.UTF8.GetBytes(jwtSecret!);

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,

                IssuerSigningKey =
                    new SymmetricSecurityKey(key),

                ValidateIssuer = false,

                ValidateAudience = false,

                RoleClaimType = "role"
            };
    });


// Authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "AdminOrContractor",
        policy =>
            policy.RequireRole(
                "ADMIN",
                "CONTRACTOR"
            )
    );

    options.AddPolicy(
        "AnyAuthenticated",
        policy =>
            policy.RequireAuthenticatedUser()
    );
});


// AutoMapper
builder.Services.AddAutoMapper(
    typeof(MappingProfile)
);


// Java service communication
builder.Services.AddHttpClient<EmployeeValidationClient>(client =>
{
    client.BaseAddress = new Uri(
        builder.Configuration[
            "Services:JavaServiceBaseUrl"
        ]!
    );
});


// Register Services
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ISiteService, SiteService>();
builder.Services.AddScoped<IDailyReportService, DailyReportService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IMaterialService, MaterialService>();
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IPhotoUploadService, PhotoUploadService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// Controllers
builder.Services.AddControllers();


var app = builder.Build();

app.UseCors();

// Authentication and authorization
app.UseAuthentication();

app.UseAuthorization();


// Map controller routes
app.MapControllers();


app.Run();