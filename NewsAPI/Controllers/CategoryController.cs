using Microsoft.AspNetCore.Mvc;
using NewsAPI.Models;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        public static List<Category> _categories = new List<Category>()
        { 
            new Category()
            {
                Id = 1,
                Name = "General",
            },
            new Category()
            {
                Id = 2,
                Name = "Course",
            },
            new Category()
            {
                Id = 3,
                Name = "Laboratory",
            }
        };

        /// <summary>
        /// Get all of the categories.
        /// </summary>
        /// <returns></returns>
        [HttpGet("/Category/all")]
        public IActionResult GetAll()
        {
            return Ok(_categories);
        }

        /// <summary>
        /// Get a specific category via its id.
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        [HttpGet("/Category/byId")]
        public IActionResult GetCategoryById(int categoryId)
        {
            return Ok(_categories.First(x => x.Id == categoryId));
        }

        /// <summary>
        /// Deletes a category via a category id.
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        [HttpDelete("/Category/delete")]
        public IActionResult DeleteCategoryById(int categoryId)
        {
            return Ok(_categories.Remove(_categories.First(x => x.Id == categoryId)));
        }
    }
}
