interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Mô tả sản phẩm</h2>
      <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line leading-relaxed">
        {description}
      </div>
    </section>
  );
};

export default ProductDescription;
