import { createContext } from 'react';
import { RealmRepository } from '../Data/Repositories/RealmRepository';
import { RealmStorage } from '../Data/LocalData/Implemetation/RealmStorage.ts';
import {RealmService} from '../Application/Services/RealmService';
import { TaskService } from '../Application/Services/TaskService';
import { TaskRepository } from '../Data/Repositories/TaskRepository';
import { TaskApi } from '../Data/api/Implementation/TaskApi';
import { ProfileImageMenuService } from '../Application/Services/ProfileImageMenuService';
import { ProfileImageMenuRepository } from '../Data/Repositories/ProfileImageMenuRepository';
import { UserService } from '../Application/Services/UserService.ts';
import { UserApi } from '../Data/api/Implementation/UserApi.ts';
import { UserRepository } from '../Data/Repositories/UserRepository.ts';
import { AuthStorage } from '../Data/LocalData/Implemetation/AuthStorage';
import { IUserService } from '../Application/Interfaces/IUserService.ts';
import { ITaskService } from '../Application/Interfaces/ITaskService';
import { IProfileImageMenuService } from '../Application/Interfaces/IProfileImageMenuService';
import { IRealmService } from '../Application/Interfaces/IRealmService';
import { IRelocationService } from '../Application/Interfaces/IRelocationService.ts';
import { RelocationService } from '../Application/Services/RelocationService.ts';
import { RelocationRepository } from '../Data/Repositories/RelocationRepository.ts';
import { IAuthStorage } from '../Data/LocalData/Interfaces/IAuthStorage';
import { AuthEventBus } from '../Channels/AuthEventBus';
import { ErrorHandlingBus } from '../Channels/ErrorHandlingBus';
import { NotificationHandlingBus } from '../Channels/NotificationHandlingBus';
import { AuthListener } from '../Presentation/Listeners/AuthListener.ts';
import { AuthApiService } from '../Data/Commons/AuthApiService.ts';
import { AuthApi } from '../Data/api/Implementation/AuthApi.ts';
import { BuildApi } from '../Data/api/Implementation/BuildApi.ts';
import { BuildRepository } from '../Data/Repositories/BuildRepository.ts';
import { BuildService } from '../Application/Services/BuildService.ts';
import { IBuildService } from '../Application/Interfaces/IBuildService.ts';
import { IClientService } from '../Application/Interfaces/IClientService.ts';
import { ClientService } from '../Application/Services/ClientService.ts';
import { ClientRepository } from '../Data/Repositories/ClientRepository.ts';
import { ClientApi } from '../Data/api/Implementation/ClientApi.ts';



const profImgMenuRepo = new ProfileImageMenuRepository();


const authEventBus = new AuthEventBus();
const errorHandlingBus = new ErrorHandlingBus();
const notificationHandlingBus = new NotificationHandlingBus();

const authStorage = new AuthStorage();
const authApi= new AuthApi();
const authService = new AuthApiService(authApi, authStorage, authEventBus, errorHandlingBus);

const userApi = new UserApi();
const userRepository = new UserRepository(userApi,authStorage,authService);
const userServ = new UserService(userRepository);

const realmstorage = new RealmStorage();
const realmRepo = new RealmRepository(realmstorage);
const realmServ = new RealmService(realmRepo,userRepository);


const navigateRepo = new RelocationRepository();
const navigateServ = new RelocationService(navigateRepo);

const profileImgMenuServ = new ProfileImageMenuService(profImgMenuRepo, userRepository);

const taskapi = new TaskApi();
const taskRepo = new TaskRepository(taskapi, authService);
const taskServ = new TaskService(taskRepo);

const buildApi = new BuildApi();
const buildRepo = new BuildRepository(buildApi, authService);
const buildServ = new BuildService(buildRepo,userRepository);

const clientApi = new ClientApi();
const clientRepo = new ClientRepository(clientApi, authService);
const clientServ = new ClientService(clientRepo);

const authListener = new AuthListener(authEventBus, userServ);
authListener.StartListening();


// Define the context interface 
interface DependencyContextType {
  realmService: IRealmService;
  profileImgMenuService: IProfileImageMenuService;
  taskService: ITaskService;
  buildService: IBuildService;
  userService: IUserService;
  clientService: IClientService;
  relocationService:IRelocationService;
  authStorage:IAuthStorage;
  errorHandlingBus:ErrorHandlingBus;
  authEventBus:AuthEventBus;
  notificationHandlingBus:NotificationHandlingBus;
}

export const DependencyContext = createContext<DependencyContextType>({
  realmService: realmServ,
  profileImgMenuService:profileImgMenuServ,
  taskService:taskServ,
  buildService:buildServ,
  userService:userServ,
  clientService:clientServ,
  relocationService:navigateServ,
  authStorage:authStorage,
  errorHandlingBus:errorHandlingBus,
  authEventBus:authEventBus,
  notificationHandlingBus:notificationHandlingBus
});

export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DependencyContext.Provider value={{ realmService: realmServ,profileImgMenuService:profileImgMenuServ,taskService:taskServ,buildService:buildServ,userService:userServ,clientService:clientServ,relocationService:navigateServ,authStorage:authStorage,errorHandlingBus:errorHandlingBus,authEventBus:authEventBus,notificationHandlingBus:notificationHandlingBus}}>
    {children}
  </DependencyContext.Provider>
);
