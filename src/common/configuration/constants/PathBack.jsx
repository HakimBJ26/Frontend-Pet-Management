export const LOGIN_API = "/api/auth/login";
export const REGISTER_API = "/api/auth/register";
export const GET_PROFILE_API = "/api/auth/profile";
export const UPDATE_PROFILE_API = "/api/auth/updateProfile";
export const GET_USERS_API = "/api/auth/GetAllUsers";
export const LOG_OUT_API = "/api/auth/logout";
export const UPDATE_USER_PROFILE_BY_ADMIN = "/api/auth/updateUserByAdmin";
export const USER_IMAGE_URL = "/api/auth/image-url";
export const REFRESH_TOKEN_API = "/api/auth/refreshToken";
export const ADD_PET_API = "/api/pets";
export const BREED_CERTIF_API = "/api/pets/request-certif";
export const VERIFY_CERTIF_CERTIF_API = "/api/certificates/verify";
export const GET_ALL_PETS_API = "/api/pets";
export const GET_PET_BY_ID_API = "/api/pets";
export const UPDATE_PET_API = "/api/pets";
export const GET_CURRENT_USER_PETS_API = "/api/pets/current";
export const GET_VETO_ACC_TO_APPROVE = '/api/auth/unapprovedUsers'
export const APPROVE_VETO_ACC_API = '/api/auth/approveUserByEmail'
export const SEND_RESET_PASS_MAIL = '/api/auth/sendResetPasswordEmail'
export const VERIFY_RESET_PASS_TOKEN = '/api/auth/verifyResetPasswordToken'
export const RESET_PASS = '/api/auth/resetPassword'
export const PET_SHOP = '/api/accessories'
export const SEARCH_IN_PET_SHOP_BY_NAME = '/api/accessories/search'
export const SEARCH_VET_BY_NAME_API = '/api/auth/search-veterinarians'
export const PET_VITAL_SIGNS = '/api/vital-signs/pet'
export const HEALTH_ALERTS_API = '/api/health-alerts/pet'
export const DISMISS_HEALTH_ALERTS_API = '/api/health-alerts'
export const OVERVIEW_API = '/api/overview/pet'
export const VET_APPOINTEMENT_API = '/api/vet-appointments'
export const PET_GOAL_API = '/api/petgoals'
export const PET_HEALTH_STATS = '/api/health-stats'
export const SAVE_MESSAGING_TOKEN = '/api/auth/messaging-token'
export const VACCINE_RECORD_API = '/api/vaccine_records'
export const SURGERY_RECORD_API = '/api/surgery_records'
export const MEDICAL_RECORD_API = '/api/medical_records'
export const VISIT_RECORD_API = '/api/visit_records'
export const SLEEP_PATTERN_API = '/api/sleep-patterns/pet'
export const ACTIVITY_PROPOSITION_API = '/api/activity-propositions'
export const PET_API ='api/pets'
export const  CERTIF_REQUESTS_API='/api/pets/certif-requests'
export const  ISSUE_CERTIF_API='/api/certificates/issue'
export const DECLINE_CERTIF_API = '/api/certificates/decline'
export const ADD_SAFE_ZONE_API = (petId) => `/api/pets/map/set-single-position/${petId}`;
export const UPDATE_SAFE_ZONE_API = (petId, safeZoneId) => `/api/pets/map/${petId}/update-safe-zones/${safeZoneId}`;
export const GET_SAFE_ZONES_API = (petId) => `/api/pets/map/${petId}/get-safe-zones`;
export const DELETE_SAFE_ZONE_API = (petId, safeZoneId) => `/api/pets/map/${petId}/delete-safe-zones/${safeZoneId}`;
export const GET_SAFE_ZONE_BY_TYPE = (petId, type) => `/api/pets/map/${petId}/${type}`;
export const GET_SAFE_ZONE_BY_HOME = (petId) => `/api/pets/map/${petId}/home`;
export const GET_SAFE_ZONE_BY_VET = (petId) => `/api/pets/map/${petId}/vet`;
export const GET_SAFE_ZONE_BY_PARK = (petId) => `/api/pets/map/${petId}/park`;
export const GET_DANGER_ZONE = (petId) => `/api/pets/map/${petId}/get-danger-zones`;
export const CHECK_Pet_IN_SAFE_ZONE= (petId) => `/api/pet/check-pet-in-safe-zone/${petId}`;
export const PET_HEALTH_SCORE = '/api/health-score/pet'



