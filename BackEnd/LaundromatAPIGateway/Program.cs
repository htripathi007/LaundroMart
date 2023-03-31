using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("ocelot.json", optional: false, reloadOnChange: true).AddEnvironmentVariables();


builder.Services.AddCors(options => {
    options.AddPolicy("ZensarCorsPolicy", p => {
        p.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
    });
});

builder.Services.AddOcelot(builder.Configuration);


var app = builder.Build();


app.UseCors("ZensarCorsPolicy");

app.UseOcelot();

//app.MapGet("/", () => "Hello World!");

app.Run();

