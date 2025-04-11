
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// Định nghĩa kiểu dữ liệu cho bài viết
interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

const AdminPosts = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Bài viết mẫu 1', content: 'Nội dung bài viết mẫu 1', date: '2023-05-15' },
    { id: 2, title: 'Bài viết mẫu 2', content: 'Nội dung bài viết mẫu 2', date: '2023-05-20' },
  ]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // Xử lý thêm bài viết mới
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
    
    setPosts([...posts, { id: newId, ...newPost, date }]);
    setNewPost({ title: '', content: '' });
    setShowAddForm(false);
    
    toast({
      title: 'Thành công',
      description: 'Đã thêm bài viết mới',
    });
  };

  // Xử lý xoá bài viết
  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: 'Thành công',
      description: 'Đã xoá bài viết',
    });
  };

  // Bắt đầu chỉnh sửa bài viết
  const handleStartEdit = (post: Post) => {
    setEditingPost({ ...post });
  };

  // Lưu bài viết sau khi chỉnh sửa
  const handleSaveEdit = () => {
    if (!editingPost) return;
    
    setPosts(posts.map(post => post.id === editingPost.id ? editingPost : post));
    setEditingPost(null);
    
    toast({
      title: 'Thành công',
      description: 'Đã cập nhật bài viết',
    });
  };

  // Huỷ chỉnh sửa
  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
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
                <TableHead className="w-[120px] text-right">Thao tác</TableHead>
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
                      {editingPost?.id === post.id ? (
                        <Input
                          value={editingPost.title}
                          onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                          className="bg-white border-gray-300"
                        />
                      ) : (
                        post.title
                      )}
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
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                rows={6}
                className="bg-white border-gray-300"
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
    </div>
  );
};

export default AdminPosts;
