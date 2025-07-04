using Ebasket.Core.Entities;
using Ebasket.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ebasket.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        public ProductsController(StoreContext stooreContext)
        {
            _storeContext = stooreContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _storeContext.Products.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _storeContext.Products.Add(product);
            await _storeContext.SaveChangesAsync();
            return product;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !ProductExists(id))
                return BadRequest("This product can not be updated.");

            _storeContext.Entry(product).State = EntityState.Modified;
            await _storeContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _storeContext.Products.Remove(product);
            await _storeContext.SaveChangesAsync();
            return Ok();
        }

        private bool ProductExists(int id)
        {
            return _storeContext.Products.Any(x => x.Id == id);
        }
    }
}
