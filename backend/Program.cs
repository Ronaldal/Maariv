using backend.Services;

var builder = WebApplication.CreateBuilder(args);

backend.EnvLoader.LoadFromContentRoot(builder.Environment.ContentRootPath);

// Add services to the container.

builder.Services.AddSingleton<ContentDataService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
