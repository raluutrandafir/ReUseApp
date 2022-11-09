namespace reuse_be.Data
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;
        public string Key { get; set; } = null!;

        public string ProductsCollectionName { get; set; } = null!;
        public string UsersCollectionName { get; set; } = null!;
    }
}
