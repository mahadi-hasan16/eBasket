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

        public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort)
        {
            var query = storeContext.Products.AsQueryable();

            if(!string.IsNullOrWhiteSpace(brand))
                query = query.Where(x => x.Brand == brand);

            if(!string.IsNullOrWhiteSpace(type))
                query = query.Where(x =>  x.Type == type);

            query = sort switch
                {
                    "priceAsc" => query.OrderBy(x => x.Price),
                    "priceDesc" => query.OrderByDescending(x => x.Price),
                    _ => query.OrderBy(x => x.Name)
                };

            return await query.ToListAsync();
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

        public async Task<IReadOnlyList<string>> GetBrandsAsync()
        {
            return await storeContext.Products.Select(x => x.Brand)
                .Distinct()
                .ToListAsync();
        }

        public async Task<IReadOnlyList<string>> GetTypesAsync()
        {
            return await storeContext.Products.Select(x => x.Type)
                .Distinct()
                .ToListAsync();
        }
    }
}
