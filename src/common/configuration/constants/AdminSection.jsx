import { ADD_ACTIVITY_PROPOSITIONS, ADMIN_DASH_PATH, MANAGE_VETO_REQUEST, PET_SHOP_MANAGEMENT, USER_MANAGEMENT_PATH } from "./Paths";

export const sections = [
    {
      id: 'user-management',
      backgroundColorKey: 'primary',
      backgroundColorIndex: 400,
      title: 'User Management',
      description: 'Manage user accounts, review user details, and update user information.',
      navigatePath: `${ADMIN_DASH_PATH}${USER_MANAGEMENT_PATH}`,
      buttonText: 'Go to User Management'
    },
    {
      id: 'vet-requests',
      backgroundColorKey: 'secondary',
      backgroundColorIndex: 400,
      title: 'Vet Account Requests',
      description: 'Review and approve veterinarian account creation requests.',
      navigatePath: `${ADMIN_DASH_PATH}${MANAGE_VETO_REQUEST}`,
      buttonText: 'Manage Vet Requests'
    },
    {
      id: 'pet-shop',
      backgroundColorKey: 'neutral',
      backgroundColorIndex: 400,
      title: 'Pet Shop Management',
      description: 'Manage pet shop inventory, update product details, and monitor stock levels.',
      navigatePath: `${ADMIN_DASH_PATH}${PET_SHOP_MANAGEMENT}`,
      buttonText: 'Go to Pet Shop Management'
    },
    {
      id: 'activity-propositions',
      backgroundColorKey: 'secondary',
      backgroundColorIndex: 800,
      title: 'Activity propositions',
      description: "Propose activities for pet's owner to improve thier pets health",
      navigatePath: `${ADMIN_DASH_PATH}${ADD_ACTIVITY_PROPOSITIONS}`,
      buttonText: 'Go to Activity propositions'
    }
  ];
  