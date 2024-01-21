using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private IConfiguration _configuration;

        public OrderDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<JsonResult> AddOrder([FromBody] OrderViewModel newOrder)
        {
            try
            {
                string query = "INSERT INTO OrderDetails (FirstName, LastName, Address, Email, OrderItems) VALUES (@FirstName, @LastName, @Address, @Email, @OrderItems)";
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("ShoppingAppCon")))
                {
                    await connection.OpenAsync();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@FirstName", newOrder.FirstName);
                        command.Parameters.AddWithValue("@LastName", newOrder.LastName);
                        command.Parameters.AddWithValue("@Address", newOrder.Address);
                        command.Parameters.AddWithValue("@Email", newOrder.Email);
                        command.Parameters.AddWithValue("@OrderItems", JsonConvert.SerializeObject(newOrder.OrderItems));

                        await command.ExecuteNonQueryAsync();
                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult($"Error: {ex.Message}");
            }
        }
    }
}
