using System.Runtime.InteropServices;

namespace NewsAPI.Models
{
    public class Announcement
    {
        public Guid Id { get; set; }

        public String? Title { get; set; }

        public String? Message { get; set; }

        public String? CategoryId { get; set; }

        public String? Author { get; set; }

        public string? ImageUrl { get; set; }

        //Title, Description, CategoryId and Author.

    }
}
