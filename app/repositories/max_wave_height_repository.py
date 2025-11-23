import xarray as xr

class MaxWaveHeightRepository():
    def __init__(self):
        self.ds = None

    def __enter__(self):
        self.ds = xr.open_dataset("data/waves_2019-01-01.nc")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.ds is not None:
            self.ds.close()
            self.ds = None

    def get_max_for_location(self, lat, lon):
        var = self.ds["hmax"]
        point = var.sel(latitude=lat, longitude=lon, method="nearest")
        max_val = point.max(dim="time").item()
        return max_val
