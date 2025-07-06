using Ebasket.Core.Entities;
using Ebasket.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Infrastructure.Data
{
    public class ProductRepository(StoreContext storeContext) : IProductRepository
    {
        public void AddProduct(Product product)
        {
            storeContext.Products.Add(product);
        }

        public void DeleteProduct(Product prooduct)
        {
            storeContext.Products.Remove(prooduct);
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await storeContext.Products.FindAsync(id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await storeContext.Products.ToListAsync();
        }

        public bool ProductExists(int id)
        {
            return storeContext.Products.Any(x => x.Id == id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await storeContext.SaveChangesAsync() > 0;
        }

        public void UpdateProduct(Product product)
        {
            storeContext.Entry(product).State = EntityState.Modified;
        }
    }
}
