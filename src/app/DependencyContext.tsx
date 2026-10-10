import { createContext } from 'react';
import { createSharedDependencies, SharedDependencies } from '../shared/composition';
import { createSecurityDependencies, SecurityDependencies } from '../modules/Security/composition';
import { createNavigationDependencies, NavigationDependencies } from '../modules/Navigation/composition';
import { createDeviceAssignmentDependencies, DeviceAssignmentDependencies } from '../modules/deviceAssignment/composition';

// Composition root: each module wires its own dependencies, this file only combines them.
type DependencyContextType = SharedDependencies & SecurityDependencies & NavigationDependencies & DeviceAssignmentDependencies;

const shared = createSharedDependencies();
const security = createSecurityDependencies(shared);

const dependencies: DependencyContextType = {
  ...shared,
  ...security,
  ...createNavigationDependencies(security.authService),
  ...createDeviceAssignmentDependencies(),
};

export const DependencyContext = createContext<DependencyContextType>(dependencies);

export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DependencyContext.Provider value={dependencies}>
    {children}
  </DependencyContext.Provider>
);
