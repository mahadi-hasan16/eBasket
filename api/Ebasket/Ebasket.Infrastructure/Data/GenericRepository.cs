using Ebasket.Core.Entities;
using Ebasket.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ebasket.Infrastructure.Data
{
    public class GenericRepository<T>(StoreContext storeContext) : IGenericRepository<T> where T : BaseEntity
    {
        void Add(T entity)
        {
            storeContext.Add(entity);
        }

        void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        bool Exists(int id)
        {
            throw new NotImplementedException();
        }

        Task<T?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<IReadOnlyList<T>> ListAllAsync()
        {
            throw new NotImplementedException();
        }

        Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
