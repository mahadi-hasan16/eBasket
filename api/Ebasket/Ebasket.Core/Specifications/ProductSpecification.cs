using Ebasket.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Core.Specifications
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParam specParam) : base(x =>
        (specParam.Brands.Count == 0 || specParam.Brands.Contains(x.Brand)) &&
        (specParam.Types.Count == 0 || specParam.Types.Contains(x.Type))) 
        {
            ApplyPaging(specParam.PageSize*(specParam.PageIndex - 1), specParam.PageSize);
            switch (specParam.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }
    }
}
