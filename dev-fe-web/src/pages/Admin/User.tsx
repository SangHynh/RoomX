import UserList from '@/components/admin/users/user-list'
import CMSLayout from '@/layouts/cms-layout'
import React from 'react'

const User: React.FC = () => {
  return (
    <CMSLayout>
        <UserList ></UserList>
    </CMSLayout>
  )
}

export default User
