import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Typography, Stack, Paper,
  IconButton, Divider, Grid, Card, CardContent, CardActions, Button, Modal, Skeleton
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import apiConstants from '../../api/Constants';
import { useTheme } from '@mui/material/styles';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AddressModal = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({ lat: 28.61, lon: 77.23 });
  const [editData, setEditData] = useState({ house: '', phone: '', landmark: '' });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!editData.house) newErrors.house = 'Required';
    if (!editData.phone) newErrors.phone = 'Required';
    if (!query) newErrors.query = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setEditData({ house: '', phone: '', landmark: '' });
    setQuery('');
    setErrors({});
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDetectLocation = () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      setCoords({ lat: coords.latitude, lon: coords.longitude });

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
      );
      const data = await res.json();

      if (data?.display_name) {
        setQuery(data.display_name);
        setShowForm(true); // ✅ Show form after location detection
        setIsEditing(false);
        setEditingId(null);
        setEditData({ house: '', phone: '', landmark: '' });
        setErrors({});
      }
    }, () => alert('Location access denied'));
  };


  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 3) return setSuggestions([]);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await res.json();
      setSuggestions(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleDelete = async (id) => {
    await apiConstants.address.delete(id);
    setAddresses(prev => prev.filter(a => a._id !== id));
    if (currentAddressId === id) setCurrentAddressId(null);
  };

  const handleEdit = (addr) => {
    setIsEditing(true);
    setEditingId(addr._id);
    setQuery(addr.addressLine);
    setEditData({ house: addr.house, phone: addr.mobile, landmark: addr.landmark });
    setCoords({ lat: addr.lat, lon: addr.lon });
    setShowForm(true);
  };

  const handleSelectSuggestion = (s) => {
    setQuery(s.display_name);
    setCoords({ lat: +s.lat, lon: +s.lon });
    setSuggestions([]);
  };

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      name: 'User',
      addressLine: query,
      mobile: editData.phone,
      house: editData.house,
      landmark: editData.landmark,
      lat: coords.lat,
      lon: coords.lon,
    };

    if (isEditing && editingId) {
      const res = await apiConstants.address.update(editingId, payload);
      setAddresses(prev => prev.map(a => (a._id === editingId ? res.data.data : a)));
      if (editingId === currentAddressId) setSelectedAddress(res.data.data);
    } else {
      const res = await apiConstants.address.create(payload);
      setAddresses(prev => [...prev, res.data.data]);
      setSelectedAddress(res.data.data);
      setCurrentAddressId(res.data.data._id);
    }

    handleCancel();
    setOpen(false);
  };

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    const res = await apiConstants.address.getAll();
    const list = res.data.data || [];
    setAddresses(list);
    if (!selectedAddress && list.length > 0) {
      setSelectedAddress(list[0]);
      setCurrentAddressId(list[0]._id);
    }
    setLoadingAddresses(false);
  };

  useEffect(() => {
    if (open) fetchAddresses();
  }, [open]);

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          borderRadius: 99, textTransform: 'none', px: 2, py: 1, display: 'flex',
          alignItems: 'center', gap: 1, maxWidth: 300, overflow: 'hidden'
        }}
      >
        <LocationOnIcon fontSize="small" />
        <Typography variant="body2" noWrap maxWidth={150}>
          {selectedAddress
            ? `${selectedAddress.house}, ${selectedAddress.addressLine.split(',')[0]}`
            : 'Set delivery location'}
        </Typography>
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', width: '100%', maxWidth: 600, borderRadius: 2, p: 3,
          boxShadow: 12, maxHeight: '90vh', overflow: 'hidden'
        }}>
          <Box sx={{
            overflowY: 'auto', maxHeight: 'calc(90vh - 48px)', pr: 1, 
            scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight={700}>Change Delivery Location</Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Box>

            {!showForm && (
              <Box display={'flex'} justifyContent={'end'}>
                <Button variant="outlined" sx={{ borderRadius: 99, mb: 2 }} onClick={() => setShowForm(true)}>
                  + Add New Address
                </Button>
              </Box>
            )}

            {showForm && (
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <Button variant="outlined" onClick={handleDetectLocation} startIcon={<MyLocationIcon />} fullWidth sx={{ borderRadius: 99 }}>
                    Detect My Location
                  </Button>
                  <TextField
                    fullWidth size="small" placeholder="Search delivery location"
                    value={query} error={!!errors.query} helperText={errors.query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'grey.600' }} /> }}
                    sx={{ borderRadius: 99, backgroundColor: 'background.default' }}
                  />
                </Stack>

                {suggestions.length > 0 && (
                  <Paper sx={{ maxHeight: 200, overflow: 'auto', borderRadius: 2, boxShadow: 3 }}>
                    {suggestions.map(s => (
                      <Box key={s.place_id} sx={{ p: 1.2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                        onClick={() => handleSelectSuggestion(s)}>
                        {s.display_name}
                      </Box>
                    ))}
                  </Paper>
                )}

                <Box sx={{ height: 200, borderRadius: 1, overflow: 'hidden', boxShadow: 2 }}>
                  <MapContainer center={[coords.lat, coords.lon]} zoom={15} style={{ height: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[coords.lat, coords.lon]} />
                  </MapContainer>
                </Box>

                <TextField size="small" label="Flat / House No *" value={editData.house}
                  error={!!errors.house} helperText={errors.house}
                  onChange={e => setEditData({ ...editData, house: e.target.value })} fullWidth />
                <TextField size="small" label="Phone Number *" value={editData.phone}
                  error={!!errors.phone} helperText={errors.phone}
                  onChange={e => setEditData({ ...editData, phone: e.target.value })} fullWidth />
                <TextField size="small" label="Landmark (optional)" value={editData.landmark}
                  onChange={e => setEditData({ ...editData, landmark: e.target.value })} fullWidth />

                <Stack direction="row" spacing={2} width={'90%'} justifyContent={'center'}>
                  <Button variant="outlined" color="error"  onClick={handleCancel} sx={{ borderRadius: 80,
                    "&:hover":{
                      backgroundColor:"unset",
                      color:'#dc2626',
                      transform:'none'
                    },
                    flex: 1 }}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={handleSave} sx={{ borderRadius: 99, flex: 1 }}>
                    {isEditing ? 'Update Address' : 'Save Address'}
                  </Button>
                </Stack>

                <Divider sx={{ my: 2 }} />
              </Stack>
            )}

            {loadingAddresses ? (
              <Stack spacing={2}>
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} height={80} variant="rectangular" sx={{ borderRadius: 1 }} />
                ))}
              </Stack>
            ) : addresses.length === 0 ? (
              <Stack spacing={2} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  No saved addresses found.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleDetectLocation}
                  startIcon={<MyLocationIcon />}
                  sx={{ borderRadius: 99 }}
                >
                  Detect My Location
                </Button>
              </Stack>
            ) : (
              <>
                <Typography fontWeight={600} my={3}>Your saved addresses</Typography>
                <Grid container spacing={1}>
                  {addresses.map((addr) => (
                    <Grid item xs={12} key={addr._id}>
                      <Card variant="outlined" sx={{ borderRadius: 1, p: 1, boxShadow: 1 }}>
                        <CardContent>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <LocationOnIcon color="primary" />
                            <Typography fontWeight={600}>{addr.name || 'Address'}</Typography>
                          </Stack>
                          <Typography variant="body2">{addr.house}, {addr.addressLine}</Typography>
                          <Typography variant="caption">📞 {addr.mobile}</Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            variant={addr._id === currentAddressId ? "contained" : "outlined"}
                            onClick={() => {
                              setSelectedAddress(addr);
                              setCurrentAddressId(addr._id);
                            }}
                          >
                            {addr._id === currentAddressId ? "Current" : "Use this"}
                          </Button>
                          <IconButton onClick={() => handleEdit(addr)}><EditIcon /></IconButton>
                          <IconButton color="error" onClick={() => handleDelete(addr._id)}><DeleteIcon /></IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddressModal;
