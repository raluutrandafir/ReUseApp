//using Microsoft.Extensions.Options;
//using MongoDB.Driver;
//using reuse_be.Data;
//using reuse_be.Models;

//namespace reuse_be.Services
//{
//    public class RequestsService
//    {
//        private readonly IMongoCollection<Request> _requestsCollection;
//        private readonly IConfiguration? configurationAccessor;

//        public RequestsService(
//            IOptions<DatabaseSettings> databaseSettings, IConfiguration configuration)
//        {
//            configurationAccessor = configuration;
//            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
//            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
//            _requestsCollection = mongoDatabase.GetCollection<Request>(databaseSettings.Value.UsersCollectionName);

//        }
//        public async Task<List<Request>> GetRequestsAsync() => await _requestsCollection.Find(_ => true).ToListAsync();

//        public async Task<Request?> GetRequestByIdAsync(string id) => await _requestsCollection.Find(x => x.Id.Equals(id)).FirstOrDefaultAsync();
//        public async Task<List<Request>?> GetRequestByUserIdAsync(string userId) => await _requestsCollection.Find(x => x.RequestorId.Equals(userId)).ToListAsync();
//        public async Task<List<Request>?> GetMessagesByUserIdAsync(string userId) => await _requestsCollection.Find(x => x.OwnerId.Equals(userId)).ToListAsync();

//        public async Task CreateRequestAsync(Request newRequest) => await _requestsCollection.InsertOneAsync(newRequest);
//        public async Task UpdateRequestByIdAsync(string id, Request updatedRequest) => await _requestsCollection.ReplaceOneAsync(x => x.Id.Equals(id), updatedRequest);
//        public async Task RemoveRequestByIdAsync(string id) => await _requestsCollection.DeleteOneAsync(x => x.Id.Equals(id));


//        public async Task<Request> AddUserRequest(Request request)
//        {
//            var checkProductExistance = _productsCollection.Find(x => x.Id.Equals(request.ProductId)).FirstOrDefaultAsync();
//            if(checkProductExistance == null)
//                return null;
//            var task = CreateRequestAsync(request);
//            if (task.IsCompleted)
//            {
//                return await Task.FromResult(request);
//                checkProductExistance.Result.isAvailable = false;
//            }
//            return null;
           
//        }
//    }
//}
