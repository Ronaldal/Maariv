using backend.Services;
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

backend.EnvLoader.LoadFromContentRoot(builder.Environment.ContentRootPath);

// Add services to the container.

builder.Services.AddSingleton<ContentDataService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields =
        HttpLoggingFields.RequestMethod
        | HttpLoggingFields.RequestPath
        | HttpLoggingFields.ResponseStatusCode
        | HttpLoggingFields.Duration;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            var raw = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS");
            var origins = string.IsNullOrWhiteSpace(raw)
                ? new[] { "http://localhost:3000", "https://localhost:3000" }
                : raw.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            if (origins.Length == 0)
            {
                origins = new[] { "http://localhost:3000", "https://localhost:3000" };
            }

            policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

var startupLogger = app.Services.GetRequiredService<ILoggerFactory>().CreateLogger("Startup");
startupLogger.LogInformation(
    "Maariv API host starting ({Environment}). Content root: {ContentRoot}",
    app.Environment.EnvironmentName,
    app.Environment.ContentRootPath);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");

app.UseHttpLogging();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
