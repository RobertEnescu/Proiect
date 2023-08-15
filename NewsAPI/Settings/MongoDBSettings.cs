using System;
namespace NewsAPI.Settings
{
    public class MongoDBSettings : IMongoDBSettings
    {
        public MongoDBSettings()
        {
        }

        public string AnnouncementsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}

