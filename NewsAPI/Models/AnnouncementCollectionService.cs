using MongoDB.Driver;
using NewsAPI.Services;
using NewsAPI.Settings;

namespace NewsAPI.Models
{
    public class AnnouncementCollectionService : IAnnouncementCollectionService
    {

        private readonly IMongoCollection<Announcement> _announcements;

        public AnnouncementCollectionService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _announcements = database.GetCollection<Announcement>(settings.AnnouncementsCollectionName);
        }


        public async Task<List<Announcement>> GetAll()
        {
            var result = await _announcements.FindAsync(announcement => true);
            return result.ToList();
        }


        public async Task<bool> Create(Announcement model)
        {
            model.Id = Guid.NewGuid();
            await _announcements.InsertOneAsync(model);
            return true;
        }
        
        public async Task<bool> Delete(Guid id)
        {
            var announcement = await _announcements.FindAsync(a => a.Id == id);
            if (announcement == null)
            {
                return false;
            }
            var isDeleted = await _announcements.DeleteOneAsync(a => a.Id == id);
            return isDeleted.IsAcknowledged && isDeleted.DeletedCount > 0;
        }

        public async Task<Announcement> Get(Guid id)
        {
            return (await _announcements.FindAsync(announcement => announcement.Id == id)).FirstOrDefault();
        }




        public async Task<List<Announcement>> GetAnnouncementsByCategoryId(string categoryId)
        {
            var filteredAnnouncements = await _announcements.FindAsync(a => a.CategoryId == categoryId);
            return filteredAnnouncements.ToList();
        }

        public async Task<bool> Update(Guid id, Announcement announcement)
        {
            announcement.Id = id;
            var result = await _announcements.ReplaceOneAsync(announcement => announcement.Id == id, announcement);
            if (!result.IsAcknowledged && result.ModifiedCount == 0)
            {
                await _announcements.InsertOneAsync(announcement);
                return false;
            }

            return true;
        }

    }
}
