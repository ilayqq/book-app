import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { BookList } from './pages/BookList';
import { EditBook } from './pages/EditBook';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='books' element={<BookList />} />
          <Route index element={<BookList />} />
          <Route path='books/edit/:id' element={<EditBook />} />
        </Route>
      </Route>
    </Routes>
  );
};