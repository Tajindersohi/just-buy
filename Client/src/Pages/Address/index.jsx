import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  IconButton,
  Modal,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import apiConstants from "../../api/Constants";
import { showError } from "../../Assets/Constants/showNotifier";
import { useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AddressModal = ({ user }) => {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [coords, setCoords] = useState({ lat: 28.61, lon: 77.23 });
  const [house, setHouse] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loadingDetect, setLoadingDetect] = useState(false);
  const [errors, setErrors] = useState({});
  const userState = useSelector((state) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  useEffect(() => {
    if (!user && !userState.isFetching) {
      const saved = localStorage.getItem("guest_location");

      if (saved) {
        const parsed = JSON.parse(saved);
        setLandmark(parsed.addressLine);
        setFullAddress(parsed.addressLine);
        setCoords({ lat: parsed.lat, lon: parsed.lon });
        return; // Do NOT open modal
      }

      setOpen(true);
    }else{
      fetchAddresses();
    }
  }, []);

  const fetchAddresses = async () => {
    const res = await apiConstants.address.getAll();
    const list = res.data.data || [];
    if(list.length > 0){
      setLandmark(list[0].addressLine);
      setFullAddress(list[0].addressLine);
      const lat = list[0].lat
      const lon = list[0].lon
      localStorage.setItem("guest_location", JSON.stringify(list[0]));
      setCoords({ lat: lat, lon: lon });
    }else{
      setOpen(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();

      setSuggestions(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleDetectLocation = () => {
    setLoadingDetect(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const pos = {
          lat: coords.latitude,
          lon: coords.longitude,
        };

        setCoords(pos);

        // Fetch readable address
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lon}`
        );
        const data = await res.json();

        if (data?.display_name) {
          setQuery(data.display_name);
          setLandmark(data.display_name);
          setFullAddress(data.display_name);
        }

        // Save guest location
        if (!user) {
          const guestData = {
            name: "User",
            addressLine: data.display_name,
            house: "",
            mobile: "",
            landmark: "",
            lat: pos.lat,
            lon: pos.lon,
          };

          localStorage.setItem("guest_location", JSON.stringify(guestData));
        }

        setLoadingDetect(false);
        setOpen(false);
      },
      () => {
        showError("Location access denied");
        setLoadingDetect(false);
      }
    );
  };

  const selectSuggestion = (s) => {
    setQuery(s.display_name);
    setCoords({ lat: +s.lat, lon: +s.lon });
    setLandmark(s.display_name);
    setFullAddress(s.display_name);
    setSuggestions([]);
    if(!user){
      setOpen(false);
    }
  };

  const validate = useCallback(() => {
    const e = {};
    if (!query) e.query = "Required";

    if (user) {
      if (!house) e.house = "Required";
      if (!phone) e.phone = "Required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [query, house, phone, user]);

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      name: "User",
      addressLine: query,
      house,
      mobile: phone,
      landmark,
      lat: coords.lat,
      lon: coords.lon,
    };

    if (user) {
      await apiConstants.address.create(payload);
    } else {
      localStorage.setItem("guest_location", JSON.stringify(payload));
    }

    setOpen(false);
  };

  const handleModalClose = () => {
    if (!fullAddress && !query) {
      showError(
        "Please select address so that we can check delivery items and time."
      );
      return; // STOP closing
    }

    setOpen(false);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        sx={{
          textTransform: "none",
          px: 1,
          py: 1,
          display: "flex",
          alignItems: "center",
          gap: 0.1,
          maxWidth: 300,
          overflow: "hidden",
        }}
      >
        <LocationOnIcon fontSize="large" />
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
          <Typography variant="subtitle2" fontWeight={600} noWrap maxWidth={150}>
            Delivered in 9 min
          </Typography>
          <Typography variant="body2" noWrap maxWidth={150} fontSize={'11px'}>
            {isMobile ? (landmark.slice(0,7) + (landmark.length > 7 ? '...' : '')) : landmark || "Set Delivery Address"}
          </Typography>
        </Box>
      </Button>

      <Modal open={open} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 450,
            bgcolor: "white",
            borderRadius: 2,
            p: 3,
            boxShadow: 10,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              Location
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Detect + OR + Search */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleDetectLocation}
              sx={{ borderRadius: 10, whiteSpace: "nowrap" }}
              startIcon={
                loadingDetect ? (
                  <CircularProgress size={18} />
                ) : (
                  <MyLocationIcon />
                )
              }
            >
              {loadingDetect ? "Detecting..." : "Detect My Location"}
            </Button>

            <Typography sx={{ fontWeight: 600, opacity: 0.6 }}>OR</Typography>

            <TextField
              label="Search Address"
              size="small"
              value={query}
              error={!!errors.query}
              helperText={errors.query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <Paper sx={{ mt: 1, maxHeight: 160, overflowY: "auto" }}>
              {suggestions.map((s) => (
                <Box
                  key={s.place_id}
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={() => selectSuggestion(s)}
                >
                  {s.display_name}
                </Box>
              ))}
            </Paper>
          )}

          {/* User-only fields */}
          <Stack spacing={2} mt={2}>
            {user && (
              <>
                <TextField
                  label="House / Flat *"
                  size="small"
                  value={house}
                  error={!!errors.house}
                  helperText={errors.house}
                  onChange={(e) => setHouse(e.target.value)}
                />

                <TextField
                  label="Phone Number *"
                  size="small"
                  value={phone}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <TextField
                  label="Landmark"
                  size="small"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 10 }}
                  onClick={handleSave}
                >
                  Save Address
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AddressModal;
