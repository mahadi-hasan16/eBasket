using Ebasket.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Ebasket.Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext storeContext)
        {
            if(!storeContext.Products.Any())
            {
                var productsData = await File.ReadAllTextAsync("../Ebasket.Infrastructure/Data/SeedData/Products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                if (products == null)
                    return;

                storeContext.Products.AddRange(products);
                await storeContext.SaveChangesAsync();
            }
        }
    }
}
