import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Accessory from '../../domain/Accessory';
import AccessoryFilter from '../../domain/AccessoryFilter';
import styles from './AccessoriesList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import {ButtonPreloader} from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { useListAccessories } from '../../application/accessory/useListAccessories';
import { useDeleteAccessory } from '../../application/accessory/useDeleteAccessory';
import { formatDate } from '../../../../shared/ui/formatting/formatDate';

export default function AccessoriesList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const [appliedFilter, setAppliedFilter] = useState<AccessoryFilter>({});
  const { data: accessories, isLoading, reload } = useListAccessories(appliedFilter);
  const { deleteAccessory, deletingIds: deletingAccessoryIds } = useDeleteAccessory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [accessoryid, setAccessoryId] = useState<string | null>(null);

  const [nameFilter, setNameFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const hasActiveFilter = nameFilter !== '' || stockFilter !== '' || dateFilter !== ''
    || Object.keys(appliedFilter).length > 0;

  const applyFilters = () => {
    setAppliedFilter({
      name: nameFilter.trim(),
      inStock: stockFilter === 'instock' ? true : stockFilter === 'outofstock' ? false : undefined,
      date: dateFilter,
    });
  }

  const clearFilters = () => {
    setNameFilter('');
    setStockFilter('');
    setDateFilter('');
    setAppliedFilter({});
  }

  const showDeleteConfirmation = (_accessoryid: string | null) => {

    if (!_accessoryid) return;

    setAccessoryId(_accessoryid);
    setShowConfirmation(true);

  }

  const deleteAccessoryConfirmed = () => {
    setShowConfirmation(false);
    handleDeleteAccessory(accessoryid);
  }

  const handleDeleteAccessory = async (accessoryid: string | null) => {

    if (!accessoryid) return;

    let result = await deleteAccessory(accessoryid);

    if (result) {
      notificationHandlingBus.NotificationOccured("Accessory deleted successfully");
      reload();
    }

  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading accessories ...</h3>
      </div>
    )

  return (
    <>
      {showConfirmation &&
        <div className={styles.confirmationcontainer} onClick={() => setShowConfirmation(false)}>
          <div className={styles.confirmationbox} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this accessory?</h3>
            <div className={styles.confirmationbuttons}>
              <button className={styles.confirmationbutton} onClick={() => deleteAccessoryConfirmed()}>Yes</button>
              <button className={styles.confirmationbutton} onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>}

      <div className={styles.maincontainer}>
        <div className={styles.accessorypagebuttonspanel}>
          <Link to={'/addaccessory'} >
            <button type="button" className={styles.addaccessorybuttonclass}>+ Add</button>
          </Link>
        </div>

        <div className={styles.filterspanel}>
          <div className={styles.filterfield}>
            <label htmlFor="nameFilter">Name</label>
            <input id="nameFilter" type="text" placeholder="Search accessories" className={styles.filterinput} value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
          </div>
          <div className={styles.filterfield}>
            <label htmlFor="stockFilter">Stock</label>
            <select id="stockFilter" className={styles.filterinput} value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
              <option value="">All</option>
              <option value="instock">In stock</option>
              <option value="outofstock">Out of stock</option>
            </select>
          </div>
          <div className={styles.filterfield}>
            <label htmlFor="dateFilter">Date</label>
            <input id="dateFilter" type="date" className={styles.filterinput} value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </div>
          <div className={styles.filterbuttons}>
            <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
            <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
          </div>
        </div>

        <div className={styles.accessoriespanel}>
          <h5 className={styles.accessorystatustitle}>
            Accessories
          </h5>

          {accessories.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.accessorystatustitle}>No accessories</h5></div>}

          {accessories.length > 0 &&
            <div className={styles.tablewrapper}>
              <table className={styles.accessoriestable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Assigned Quantity</th>
                    <th>Available Quantity</th>
                    <th>Date</th>
                    <th className={styles.actionscolumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
          {accessories.map((accessory: Accessory, index) => (
            <tr key={accessory.id ?? index} className={styles.accessoryrow}>
              <td className={styles.namecell}>
                {accessory.name}
              </td>
              <td>
                <span className={`${styles.quantitybadge} ${accessory.quantity <= 0 ? styles.outofstock : ''}`}>
                  {accessory.quantity}
                </span>
              </td>
              <td>
                <span className={styles.quantitybadge}>
                  {accessory.assignedQuantity}
                </span>
              </td>
              <td>
                <span className={`${styles.quantitybadge} ${accessory.availableQuantity <= 0 ? styles.outofstock : ''}`}>
                  {accessory.availableQuantity}
                </span>
              </td>
              <td>
                {formatDate(accessory.date)}
              </td>
              <td className={styles.actionscolumn}>
              <div className={styles.accessorybuttonspan}>
                <Link to={`/editaccessory/${accessory.id}`}>
                  <button className={styles.accessorylistbuttonclass}>
                    <svg width="20" height="20" fill="black" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.936 494.936">
                      <g>
                        <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path> <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.970,5.396-4.250L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.050c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path>
                      </g>
                    </svg>
                  </button>
                </Link>
                <button className={styles.accessorylistbuttonclass} onClick={() => showDeleteConfirmation(accessory.id)}>
                  {deletingAccessoryIds.has(accessory.id!) ? <ButtonPreloader /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16" >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  )}
                </button>
              </div>
              </td>
            </tr>
          ))}
                </tbody>
              </table>
            </div>}

        </div>
      </div>
    </>
  );
}
