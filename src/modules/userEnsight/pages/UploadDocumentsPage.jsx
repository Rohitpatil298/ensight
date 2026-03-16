import { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  Container, 
  Fade,
} from '@mui/material';
import { 
  RotateRight as RotateRightIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Crop as CropIcon,
} from '@mui/icons-material';
import { Header } from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const UploadDocumentsPage = () => {
  const navigate = useNavigate();
  const panCardInputRef = useRef(null);
  const govtDeclInputRef = useRef(null);

  const [panCardFile, setPanCardFile] = useState(null);
  const [panCardPreview, setPanCardPreview] = useState(null);

  const [govtDeclFile, setGovtDeclFile] = useState(null);
  const [govtDeclPreview, setGovtDeclPreview] = useState(null);

  const [mounted, setMounted] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (type) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'pancard') {
          setPanCardFile(file);
          setPanCardPreview(reader.result);
        } else {
          setGovtDeclFile(file);
          setGovtDeclPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitLater = () => {
    console.log('Submit later clicked');
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!panCardFile) {
      alert('Please upload Pan Card');
      return;
    }

    console.log('Submitting documents:', { panCardFile, govtDeclFile });
    // Add your document upload logic here
    // navigate to next page or show success
  };


const ImageUploadSection = ({
  title,
  required,
  file,
  preview,
  onFileChange,
  inputRef,
  showControls = false,
}) => {
  const cropperRef = useRef(null);

  const handleRotate = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.rotate(90);
    }
  };

  const handleZoomIn = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.zoom(0.1);
    }
  };

  const handleZoomOut = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.zoom(-0.1);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      width: 1000,
      height: 630,
    });

    const croppedImage = canvas.toDataURL("image/jpeg", 0.9);

    // Update preview with cropped image
    onFileChange({
      target: {
        files: [dataURLtoFile(croppedImage, file?.name || "cropped.jpg")],
      },
    });

    console.log('Image cropped successfully');
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Box
      sx={{
        border: "2px solid #e2e8f0",
        borderRadius: 2,
        p: 3,
        mb: 3,
        bgcolor: "white",
      }}
    >
      {/* Title + Upload */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#334155",
            fontSize: "1rem",
          }}
        >
          {title}
          {required && <span style={{ color: "#E53935" }}>*</span>}
        </Typography>

        <Button
          component="label"
          sx={{
            px: 3,
            py: 0.8,
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "white",
            bgcolor: "#FF5722",
            borderRadius: 1,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#E64A19",
            },
          }}
        >
          Choose File
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={onFileChange}
          />
        </Button>

        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
            fontSize: "0.95rem",
          }}
        >
          {file ? file.name : "No file chosen"}
        </Typography>
      </Box>

      {preview && (
        <Box>
          {/* Cropper */}
          <Box
            sx={{
              width: "100%",
              height: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Cropper
              src={preview}
              style={{ height: 350, width: "100%" }}
              aspectRatio={85.6 / 54} // PAN Card ratio
              guides={true}
              viewMode={2}
              responsive={true}
              autoCropArea={1}
              background={false}
              ref={cropperRef}
            />
          </Box>

          {/* Controls */}
          {showControls && (
            <Box>
              {/* Rotate and Zoom Buttons */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                <Button
                  onClick={handleRotate}
                  startIcon={<RotateRightIcon />}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "white",
                    bgcolor: "#2196F3",
                    borderRadius: 1,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#1976D2",
                    },
                  }}
                >
                  Rotate
                </Button>

                <Button
                  onClick={handleZoomIn}
                  startIcon={<ZoomInIcon />}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "white",
                    bgcolor: "#2196F3",
                    borderRadius: 1,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#1976D2",
                    },
                  }}
                >
                  Zoom +
                </Button>

                <Button
                  onClick={handleZoomOut}
                  startIcon={<ZoomOutIcon />}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "white",
                    bgcolor: "#2196F3",
                    borderRadius: 1,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#1976D2",
                    },
                  }}
                >
                  Zoom -
                </Button>
              </Box>

              {/* Crop Button */}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleCrop}
                  startIcon={<CropIcon />}
                  sx={{
                    px: 8,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "white",
                    bgcolor: "#00C853",
                    borderRadius: 1,
                    textTransform: "none",
                    minWidth: 200,
                    "&:hover": {
                      bgcolor: "#00A844",
                    },
                  }}
                >
                  Crop
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f8fafc 0%, #eef1f5 40%, #f0f2f7 100%)',
      }}
    >
      {/* Background Layer */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=60)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) saturate(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(248,250,252,0.75) 0%, rgba(240,242,247,0.9) 100%)',
          }}
        />
      </Box>

      {/* Header */}
      <Box sx={{ position: 'relative', zIndex: 10 }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 5, py: 6 }}>
        <Fade in={mounted} timeout={600}>
          <Box>
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                fontWeight: 600,
                color: '#1E293B',
                mb: 2,
                letterSpacing: '0.02em',
              }}
            >
              Please upload scan copy of required documents.
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: '#475569',
                mb: 4,
                fontSize: '0.95rem',
                px: 4,
              }}
            >
              I, Test ME here by attest the scanned copy uploaded & confirm that the document is true, correct or genuine by signing.
            </Typography>

            {/* Main Card */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'visible',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 60px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.9)',
                p: 5,
                mb: 4,
              }}
            >
              {/* Pan Card Upload */}
              <ImageUploadSection
                title="Pan Card"
                required
                file={panCardFile}
                preview={panCardPreview}
                onFileChange={handleFileChange('pancard')}
                inputRef={panCardInputRef}
                showControls={true}
              />

              {/* Govt Employee Declaration Upload */}
              <ImageUploadSection
                title="Govt. Employee Declaration:"
                required={false}
                file={govtDeclFile}
                preview={govtDeclPreview}
                onFileChange={handleFileChange('govtdecl')}
                inputRef={govtDeclInputRef}
                showControls={govtDeclPreview !== null}
              />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
                <Button
                  onClick={handleSubmitLater}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#C62828',
                    borderRadius: 1,
                    textTransform: 'uppercase',
                    minWidth: 200,
                    boxShadow: '0 4px 12px rgba(198,40,40,0.3)',
                    '&:hover': {
                      bgcolor: '#B71C1C',
                      boxShadow: '0 6px 16px rgba(198,40,40,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Submit Later
                </Button>

                <Button
                  onClick={handleSubmit}
                  sx={{
                    px: 6,
                    py: 1.8,
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'white',
                    bgcolor: '#00C853',
                    borderRadius: 1,
                    textTransform: 'uppercase',
                    minWidth: 200,
                    boxShadow: '0 4px 12px rgba(0,200,83,0.3)',
                    '&:hover': {
                      bgcolor: '#00A844',
                      boxShadow: '0 6px 16px rgba(0,200,83,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default UploadDocumentsPage;