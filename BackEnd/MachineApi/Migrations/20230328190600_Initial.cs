using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MachineApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Machine",
                columns: table => new
                {
                    MachineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MachineCapacity = table.Column<int>(type: "int", nullable: false),
                    WorkingStatus = table.Column<bool>(type: "bit", nullable: false),
                    LockStatus = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ShopId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machine", x => x.MachineId);
                });

            migrationBuilder.CreateTable(
                name: "Shop",
                columns: table => new
                {
                    ShopId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShopName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShopArea = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShopCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShopPinCode = table.Column<int>(type: "int", nullable: false),
                    ShopStartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShopEndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShopWorkingStatus = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shop", x => x.ShopId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Machine");

            migrationBuilder.DropTable(
                name: "Shop");
        }
    }
}
