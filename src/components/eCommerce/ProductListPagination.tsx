import { Pagination } from 'antd';

interface ProductListPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

const ProductListPagination = ({ current, total, pageSize, onChange }: ProductListPaginationProps) => {
  if (total <= pageSize) return null;
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        showQuickJumper
        showTotal={(t) => `${t} sản phẩm`}
      />
    </div>
  );
};

export default ProductListPagination;
