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
            var userId = "63b582e21d4c50019372afd2"; 
            var donations = Category.Donations.ToString();
            var swaps = Category.Swaps.ToString();
            var clothesSubcategory = Subcategory.Clothes.ToString();
            var shoesSubcategory = Subcategory.Shoes.ToString();
            var accesoriesSubcategory = Subcategory.Accesories.ToString();
            var homeAppliances = Subcategory.HomeAppliances.ToString();

            var gardenSubcategory = Subcategory.Garden.ToString();

            var product1 = new Product("Blouse", "Male's blouse, new, size S", donations, clothesSubcategory,true, null, userId);
            var product2 = new Product("Shoes", "Male's shoes, new, size 39", swaps, clothesSubcategory, true, null, userId);

            var product3 = new Product("Blouse", "Women's dress, size S", donations, clothesSubcategory, true, null, userId) ;

            var product4 = new Product("Ring", "Indigen model ring, new, size 55", swaps, accesoriesSubcategory, true, null, userId);

            var product5 = new Product("Wahing amchine", "7,6 kg washing machine, new, year 2020", donations, homeAppliances, true, null, userId);

            var product6 = new Product("Red roses", "Red roses in a poth", swaps, gardenSubcategory, true, null, userId);

            await productsService.CreateProductAsync(product1);
            await productsService.CreateProductAsync(product2);
            await productsService.CreateProductAsync(product3);
            await productsService.CreateProductAsync(product4);
            await productsService.CreateProductAsync(product5);
            await productsService.CreateProductAsync(product6);

        }


    }
}
