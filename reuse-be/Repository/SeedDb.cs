using reuse_be.Models;
using reuse_be.Services;

namespace reuse_be.Repository
{
    public class SeedDb
    {
        private readonly ProductsService productsService;
        public SeedDb(ProductsService _productsService)
        {
            productsService = _productsService;
            createMockProductsToDb();
        }

        public async void createMockProductsToDb()
        {
            var donations = Category.Donations.ToString();
            var swaps = Category.Swaps.ToString();
            var clothesSubcategory = Subcategory.Clothes.ToString();
            var shoesSubcategory = Subcategory.Shoes.ToString();
            var accesoriesSubcategory = Subcategory.Accesories.ToString();

            var product1 = new Product("Blouse", "Male's blouse, new, size S", donations, clothesSubcategory) ;
            var product2 = new Product("sHOES", "Male's blouse, new, size 39", swaps, shoesSubcategory);
            var product3 = new Product("Blouse", "Male's blouse, new, size S", donations, clothesSubcategory) ;
            var product4 = new Product("sHOES", "Male's blouse, new, size 39", swaps, shoesSubcategory);

            await productsService.CreateProductAsync(product1);
            await productsService.CreateProductAsync(product2);
            await productsService.CreateProductAsync(product3);
            await productsService.CreateProductAsync(product4);
        }
        

    }
}
