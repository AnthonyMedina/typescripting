interface User {
  email: string;
  password: string;
}

interface ConfirmedUser extends User {
  isActive: true;
}

interface Admin extends ConfirmedUser {
  adminSince: Date;
}

export class AccountManager {
  users: User[] = new Array();

  register(email: string, password: string): User {
    if (!email) throw 'Must provide an email';
    if (!password) throw 'Must provide a password';
    const user = { email, password };
    this.users.push(user);
    return user;
  }

  activateNewUser(approver: Admin, userToApprove: User): ConfirmedUser {
    if (!approver.adminSince) throw 'Approver is not an admin!';
    return {
      ...userToApprove,
      isActive: true
    }
  }

  promoteToAdmin(existingAdmin: Admin, user: ConfirmedUser): Admin {
    if (!existingAdmin.adminSince) throw 'Not an admin!';
    if (user.isActive !== true)
      throw 'User must be active in order to be promoted to admin!';
    return {
      ...user,
      adminSince: new Date(),
    }
  }
}
