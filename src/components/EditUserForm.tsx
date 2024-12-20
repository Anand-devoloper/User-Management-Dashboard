import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../types/User';

interface EditUserFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<User, 'id'>>({
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const submitHandler: SubmitHandler<Omit<User, 'id'>> = (data) => {
    onSave({ ...user, ...data });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <h2>Edit User</h2>
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
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;