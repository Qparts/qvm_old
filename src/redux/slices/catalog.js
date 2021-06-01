import { createSlice } from '@reduxjs/toolkit';
import catalogService from 'src/services/catalogService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    catalogs: [],
    models: [],
    filters: [],
    selectedCatalog: null,
    selectedModel: null,
    selectedCar: null,
    cars: [],
    groups: [],
    groupsStack: [],
    part: null,
    fromList: false,
    showCarInfo: false,
    filterKeysMap: new Map(),
    partCoordinates: [],
    partImageHeight: 547,
    partImageWidth: 1024,
    backToCarInfo: true

};


const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        // GET CATALOGS
        getCatalogsSuccess(state, action) {
            state.isLoading = false;
            state.catalogs = action.payload;
        },

        // GET MODELS
        getModelsSuccess(state, action) {
            state.isLoading = false;
            state.models = action.payload.models;
            state.selectedCatalog = action.payload.selectedCatalog;
            state.selectedModel = action.payload.selectedModel;
            state.error = '';
        },

        //handle model change
        handleModelChangeSuccess(state, action) {
            state.isLoading = false;
            state.filters = action.payload.filters;
            state.selectedModel = action.payload.selectedModel;
            state.error = '';
        },

        //handle filter change
        handleFilterChangeSuccess(state, action) {
            state.isLoading = false;
            state.filters = action.payload.filters;
            state.filterKeysMap = action.payload.filterKeysMap;
            state.error = '';
        },

        //get car info from list
        getCarInfoSuccess(state, action) {
            state.isLoading = false;
            state.cars = action.payload.cars;
            state.groups = action.payload.groups;
            state.part = action.payload.part;
            state.showCarInfo = action.payload.showCarInfo;
            state.fromList = action.payload.fromList;
            state.error = '';
        },

        //get group
        getGroupsSuccess(state, action) {
            state.isLoading = false;
            state.groups = action.payload.groups;
            state.selectedCar = action.payload.selectedCar ? action.payload.selectedCar : state.selectedCar;
            state.backToCarInfo = action.payload.groupId ? false : true;
            if (action.payload.groupId)
                state.groupsStack.push(action.payload.groupId);
            state.error = '';
        },


        //get part
        getPartSuccess(state, action) {
            state.isLoading = false;
            state.part = action.payload.part;
            state.partCoordinates = action.payload.partCoordinates;
            state.partImageHeight = action.payload.partImageHeight;
            state.partImageWidth = action.payload.partImageWidth;
            if (action.payload.groupId)
                state.groupsStack.push(action.payload.groupId);
            state.error = '';
        },

        backSuccess(state, action) {
            state.isLoading = false;
            state.part = action.payload.part;
            state.groupsStack = action.payload.groupsStack;
            state.backToCarInfo = action.payload.backToCarInfo;
            state.groups = action.payload.groups;
            state.error = '';
        },



        disappearBreadcrumbs(state) {
            state.showCarInfo = false;
            state.cars = [];
            state.filterKeysMap = new Map();
        },


        cleanup(state) {
            state.isLoading = false;
            state.error = '';
            state.catalogs = [];
            state.models = [];
            state.filters = [];
            state.selectedCatalog = null;
            state.selectedModel = null;
            state.selectedCar = null;
            state.cars = [];
            state.groups = [];
            state.groupsStack = [];
            state.part = null;
            state.fromList = false;
            state.showCarInfo = false;
            state.filterKeysMap = new Map();
            state.partCoordinates = [];
            state.backToCarInfo = true;
        }



    }

});

// Reducer
export default slice.reducer;


// Actions
export const {
    disappearBreadcrumbs,
    cleanup
} = slice.actions;

export function getCatalogs() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: catalogs } = await catalogService.getCatalogs();
            dispatch(slice.actions.getCatalogsSuccess(catalogs));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}


export function getModels(catalogId, catalogs) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            let selectedCatalog;
            for (let catalog of catalogs) {
                if (catalog.id == catalogId) selectedCatalog = catalog;
            }
            const { data: models } = await catalogService.getModels(catalogId);
            dispatch(slice.actions.getModelsSuccess({ models: models, selectedCatalog: selectedCatalog, selectedModel: null }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}


export function handleModelChange(modelId, models, selectedCatalog) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: filters } = await catalogService.getFilters(
                selectedCatalog.id,
                modelId,
                null
            );
            let selectedModel = models.find((e) => e.id == modelId);
            dispatch(slice.actions.handleModelChangeSuccess({ selectedModel: selectedModel, filters: filters }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}

export function getCarInfo(catalogid, modelid, params) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: cars } = await catalogService.getCars(
                catalogid,
                modelid,
                params
            );
            dispatch(slice.actions.getCarInfoSuccess({ cars: cars, fromList: true, groups: [], part: null, showCarInfo: true, }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}


export function getCarByVin(query) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: cars } = await catalogService.getCarbyVin(query);
            dispatch(slice.actions.getCarInfoSuccess({ cars: cars, fromList: false, groups: [], part: null, showCarInfo: true, }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}


export function handleFilterChange(filterKeysMap, selectedCatalog, selectedModel, key, item) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            let newMap = new Map(filterKeysMap);
            if (item)
                newMap.set(key, item);
            else
                newMap.delete(key);

            let params = "";
            newMap.forEach((mapItem) => {
                params = params + mapItem.idx + ",";
            });

            const { data: cars } = await catalogService.getCars(
                selectedCatalog.id,
                selectedModel.id,
                params.substring(0, params.length - 1)
            );

            dispatch(slice.actions.getCarInfoSuccess({ cars: cars, fromList: true, groups: [], part: null, showCarInfo: true, }));

            const { data: filters } = await catalogService.getFilters(
                selectedCatalog.id,
                selectedModel.id,
                params.substring(0, params.length - 1)
            );
            dispatch(slice.actions.handleFilterChangeSuccess({ filters: filters, filterKeysMap: newMap }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}


export function getGroups(catalogId, carId, groupId, criterias, car) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: groups } = await catalogService.getGroups(
                catalogId,
                carId,
                groupId,
                criterias
            );
            dispatch(slice.actions.getGroupsSuccess({ groups: groups, selectedCar: car, groupId: groupId }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response.data));
        }
    };
}




export function getPart(catalogId, carId, groupId, criterias) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: part } = await catalogService.getPart(
                catalogId,
                carId,
                groupId,
                criterias
            );

            getMeta(part.img, (width, heigh) => {
                let partCoordinates = getMapCoordinate(part.positions, width, heigh);
                dispatch(slice.actions.getPartSuccess({
                    part: part, groupId: groupId, partCoordinates: partCoordinates,
                    partImageHeight: heigh, partImageWidth: width
                }));

            });

        } catch (error) {
            console.log('error', error);
            dispatch(slice.actions.hasError(error.response.data));
        }
    };

}


export function handleBackAction(part, selectedCatalog, selectedCar, fromList, groupsStack, backToCarInfo) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            let newGroupsStack = [...groupsStack];
            if (part) part = null;
            if (!backToCarInfo) {
                newGroupsStack.splice(newGroupsStack.length - 1, 1);
                const catalogId = fromList ? selectedCatalog.id : selectedCar.catalogId;
                const carId = fromList ? selectedCar.id : selectedCar.carId;
                if (newGroupsStack.length > 0) {
                    const { data: groups } = await catalogService.getGroups(
                        catalogId,
                        carId,
                        newGroupsStack[newGroupsStack.length - 1],
                        null
                    );
                    dispatch(slice.actions.backSuccess({ groups: groups, groupsStack: newGroupsStack, backToCarInfo: false, part: part }));

                } else {
                    const { data: groups } = await catalogService.getGroups(
                        catalogId,
                        carId,
                        null,
                        null
                    );
                    dispatch(slice.actions.backSuccess({ groups: groups, groupsStack: newGroupsStack, backToCarInfo: true, part: part }));

                }
            }
            else {
                dispatch(slice.actions.backSuccess({ groups: [], groupsStack: newGroupsStack, backToCarInfo: true, part: part }));
            }
        } catch (error) {
            console.log('error', error);
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };

}



function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(this.width, this.height);
    };
};


function getMapCoordinate(positions, imageWidth, imageHeigh) {
    let coordinates = new Map();
    let widthRatio = 800 / imageWidth;
    let highValue = (imageHeigh * 800) / imageWidth;
    let heightRatio = highValue / imageHeigh;
    let id = 0;
    for (let item of positions) {
        let cordinateItem = {
            _id: id,
            name: item.number,
            shape: "rect",
            coords: [
                item.coordinates[0] * widthRatio,
                item.coordinates[1] * heightRatio,
                (item.coordinates[0] + item.coordinates[2]) * widthRatio,
                (item.coordinates[1] + item.coordinates[3]) * heightRatio,
            ],
            preFillColor: "rgba(252, 217, 214, 0.5)",
        };
        id++;
        coordinates.set(item.number, cordinateItem);
    }

    let coordinateValues = Array.from(coordinates, ([name, value]) => value);

    return coordinateValues;
};


