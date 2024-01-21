namespace WebAPI.Models
{
    public class OrderViewModel
    {
        public int OrderId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderItemViewModel>? OrderItems { get; set; }
    }

    public class OrderItemViewModel
    {
        public string? Name { get; set; }
        public int? Quantity { get; set; }
    }
}