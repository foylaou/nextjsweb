async function getProducts() {
  // 這裡可以放取得產品資料的邏輯
  return [
    { id: 1, name: "產品 1", price: 100 },
    { id: 2, name: "產品 2", price: 200 },
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow-sm"
        >
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  )
}