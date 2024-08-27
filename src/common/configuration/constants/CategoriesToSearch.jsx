import { Pets as PetsIcon, Storefront as StorefrontIcon, AccountCircle as AccountCircleIcon, LocalOffer as LocalOfferIcon } from '@mui/icons-material';

export const VETO_CATEGORIES = 'Veterinarian'
export const ACCESSORIES_CATEGORIES = 'Accessories'
export const categories = [
    { label: VETO_CATEGORIES, icon: <AccountCircleIcon /> },
    { label: ACCESSORIES_CATEGORIES, icon: <StorefrontIcon /> },
  ];

  export const VITAL_PET_FIELD= ['Heart Rate', 'Temperature', 'Activity Level']