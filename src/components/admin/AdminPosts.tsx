import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Tag, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import ProductConfigurationForm, { ProductConfiguration } from './ProductConfigurationForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  productConfig?: ProductConfiguration;
}

const AdminPosts = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    { 
      id: 1, 
      title: 'TechForce Gaming PC RTX 4070', 
      content: 'Máy tính chơi game hiệu năng cao với card đồ họa mới nhất', 
      date: '2023-05-15',
      productConfig: {
        name: 'TechForce Gaming PC RTX 4070',
        price: 2499.99,
        category: 'Gaming PC',
        description: 'Máy tính chơi game hiệu năng cao với card đồ họa mới nhất',
        specs: {
          processor: 'Intel Core i9-13900K',
          memory: '32GB DDR5',
          storage: '2TB NVMe SSD',
          graphics: 'NVIDIA RTX 4070',
        },
        images: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'],
        discount: {
          percentage: 10,
          code: 'GAMING10'
        }
      }
    },
    { 
      id: 2, 
      title: 'CyberBook Pro 16', 
      content: 'Laptop mỏng nhẹ dành cho công việc chuyên nghiệp', 
      date: '2023-05-20',
      productConfig: {
        name: 'CyberBook Pro 16',
        price: 1799.99,
        category: 'Laptop',
        description: 'Laptop mỏng nhẹ dành cho công việc chuyên nghiệp',
        specs: {
          processor: 'AMD Ryzen 9 7950X',
          memory: '16GB DDR5',
          storage: '1TB NVMe SSD',
          graphics: 'AMD Radeon Graphics',
          display: '16-inch Retina Display'
        },
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80']
      }
    },
  ]);
  
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết',
        variant: 'destructive',
      });
      return;
    }

    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    const date = new Date().toISOString().split('T')[0];
    
    const post = { id: newId, ...newPost, date };
    setPosts([...posts, post]);
    setNewPost({ title: '', content: '' });
    setShowAddForm(false);
    
    setCurrentPost(post);
    setShowConfigForm(true);
    
    toast({
      title: 'Thành công',
      description: 'Đã thêm bài viết mới',
    });
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: 'Thành công',
      description: 'Đã xoá bài viết',
    });
  };

  const handleStartEdit = (post: Post) => {
    setEditingPost({ ...post });
  };

  const handleSaveEdit = () => {
    if (!editingPost) return;
    
    setPosts(posts.map(post => post.id === editingPost.id ? editingPost : post));
    setEditingPost(null);
    
    toast({
      title: 'Thành công',
      description: 'Đã cập nhật bài viết',
    });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleEditConfig = (post: Post) => {
    setCurrentPost(post);
    setShowConfigForm(true);
  };

  const handleSaveConfig = (config: ProductConfiguration) => {
    if (!currentPost) return;

    const updatedPost = {
      ...currentPost,
      title: config.name,
      productConfig: config,
    };

    setPosts(posts.map(post => post.id === currentPost.id ? updatedPost : post));
    setShowConfigForm(false);
    setCurrentPost(null);

    toast({
      title: 'Thành công',
      description: 'Đã lưu cấu hình sản phẩm',
    });
  };

  const handleCancelConfig = () => {
    setShowConfigForm(false);
    setCurrentPost(null);
  };

  return (
    <div className="space-y-6">
      {showConfigForm && currentPost ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Cấu hình sản phẩm: {currentPost.title}</h2>
            <Button variant="outline" onClick={handleCancelConfig}>
              <X className="h-4 w-4 mr-2" /> Đóng
            </Button>
          </div>
          <ProductConfigurationForm
            initialConfig={currentPost.productConfig}
            onSave={handleSaveConfig}
            onCancel={handleCancelConfig}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
            <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-tech-blue hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" /> Thêm bài viết
            </Button>
          </div>

          {showAddForm && (
            <Card className="bg-white border border-gray-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Tiêu đề
                    </label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Nhập tiêu đề bài viết"
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung
                    </label>
                    <Textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Nhập nội dung bài viết"
                      rows={5}
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Huỷ
                    </Button>
                    <Button className="bg-tech-blue hover:bg-blue-700" onClick={handleAddPost}>
                      Thêm bài viết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white border border-gray-200">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead className="w-[150px]">Ngày tạo</TableHead>
                    <TableHead className="w-[180px] text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        Chưa có bài viết nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell>
                          <div>
                            {editingPost?.id === post.id ? (
                              <input
                                type="text"
                                value={editingPost.title}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                className="w-full border rounded px-2 py-1"
                              />
                            ) : (
                              <div className="font-medium">{post.title}</div>
                            )}
                            
                            {post.productConfig && (
                              <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                                {post.productConfig.images?.length > 0 && (
                                  <span className="flex items-center">
                                    <Image className="h-3 w-3 mr-1" /> {post.productConfig.images.length} ảnh
                                  </span>
                                )}
                                
                                {post.productConfig.discount && (
                                  <span className="flex items-center text-green-600">
                                    <Tag className="h-3 w-3 mr-1" /> Giảm {post.productConfig.discount.percentage}%
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell className="text-right">
                          {editingPost?.id === post.id ? (
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancelEdit}
                                className="h-8 w-8 text-gray-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSaveEdit}
                                className="h-8 w-8 text-green-600"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleStartEdit(post)}
                                className="h-8 w-8 text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditConfig(post)}
                                className="h-8 w-8 text-purple-600"
                                title="Cấu hình sản phẩm"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeletePost(post.id)}
                                className="h-8 w-8 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {editingPost && (
            <Card className="bg-white border border-gray-200 mt-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-3">Chỉnh sửa nội dung</h3>
                <div className="space-y-4">
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={6}
                    className="w-full border rounded p-2"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Huỷ
                    </Button>
                    <Button className="bg-tech-blue hover:bg-blue-700" onClick={handleSaveEdit}>
                      Lưu thay đổi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPosts;
