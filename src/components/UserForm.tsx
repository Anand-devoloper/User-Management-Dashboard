import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../types/User';

interface UserFormProps {
  onSubmit: (data: Omit<User, 'id'>) => void;
  defaultValues?: Omit<User, 'id'>;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<Omit<User, 'id'>> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Enter name"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
          placeholder="Enter email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Role</label>
        <select {...register('role', { required: 'Role is required' })}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
