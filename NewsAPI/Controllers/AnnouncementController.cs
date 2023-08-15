using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAPI.Models;
using NewsAPI.Services;
using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementController : ControllerBase
    {
        IAnnouncementCollectionService _announcementCollectionService;

        public AnnouncementController(IAnnouncementCollectionService announcementCollectionService)
        {
            _announcementCollectionService = announcementCollectionService;
        }

        /// <summary>
        /// this is another summary
        /// </summary>
        /// <returns>Ok</returns>
        [HttpGet("/Announcements")]
        public async Task<IActionResult> GetAnnouncements()
        {
            List<Announcement> announcements = await _announcementCollectionService.GetAll();
            return Ok(announcements);
        }


        [HttpGet("/Announcements/{id}")]
        public async Task<IActionResult> GetAnnouncement(Guid id)
        {
            Announcement announcement = await _announcementCollectionService.Get(id);
            return Ok(announcement);
        }

        [HttpGet("/Announcements/category/{id}")]
        public async  Task<IActionResult> GetAnnouncement([FromBody] string id)
        {
            var aux =await _announcementCollectionService.GetAnnouncementsByCategoryId(id);

            if(aux == null)
            {
                return NotFound("Not found");
            }
            return Ok(aux);
        }

        /// <summary>
        /// this is third summary
        /// </summary>
        /// <returns></returns>
        [HttpPost("/Announcements/create")]
        public async Task<IActionResult> CreateAnnouncement(
            [FromBody] Announcement announcement)
        {
            if (announcement == null)
            {
                return BadRequest("Announcement cannot be null");
            }

            var isCreated = await _announcementCollectionService.Create(announcement);

            if(!isCreated)
                {
                    return BadRequest("Something went wrong.");
                }

                //if(!_announcementCollectionService.GetAll().Contains(_announcementCollectionService.Get(announcement.Id)))//11. I guess
                //{
                //    return StatusCode(StatusCodes.Status500InternalServerError, "Error in processing the Announcement");
                //}


            return CreatedAtAction(
                    nameof(CreateAnnouncement),
                    new { id = announcement.Id },
                    announcement);
            

        }

        /// <summary>
        /// carti opium
        /// </summary>
        /// <param name="announcement"></param>
        /// <returns></returns>
        [HttpPut("/Announcements/update/{id}")]
        public async Task<IActionResult> UpdateAnnouncement([FromBody] Announcement announcement, [Required] Guid id)
        {
            var isUpdated = await _announcementCollectionService.Update(id, announcement);
            if (isUpdated==false)
            {
                return BadRequest("Announcement cannot be null");
            }

            return Ok();
        }

        /// <summary>
        /// kekw /j
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("/Announcements/delete/{id}")]
        public async Task<IActionResult> DeleteAnnouncement([Required] Guid id)
        {
            var isDeleted = await _announcementCollectionService.Delete(id);
            if (isDeleted==false)
            {
                return NotFound("Not found");
            }

            return Ok();
        }
    }
}
