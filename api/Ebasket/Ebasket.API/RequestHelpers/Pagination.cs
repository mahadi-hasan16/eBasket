namespace Ebasket.API.RequestHelpers
{
    public class Pagination<T>(int pageIndex, int pazeSize, int count, IReadOnlyList<T> data)
    {
        public int PageIndex { get; set; } = pageIndex;
        public int PageSize { get; set; } = pazeSize;
        public int Count { get; set; } = count;
        public IReadOnlyList<T> Data { get; set; } = data;
    }
}
