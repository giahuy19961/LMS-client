import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const LoginForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Controller
        control={control}
        name='username'
        rules={{
          required: "Tên đăng nhập là bắt buộc",
        }}
        render={({ field }) => (
          <TextField
            placeholder='Tên đăng nhập'
            type='text'
            {...field}
            error={errors.username?.type === "required" && true}
            helperText={errors.username?.message}
          />
        )}
      />

      <Controller
        control={control}
        name='password'
        rules={{
          required: "Mật khẩu là bắt buộc",
        }}
        render={({ field }) => (
          <TextField
            placeholder='Nhập mật khẩu'
            type={showPassword ? "text" : "password"}
            {...field}
            error={errors.password?.type === "required" && true}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Button
        variant='contained'
        size='large'
        color='secondary'
        type='submit'
        sx={{
          textTransform: "capitalize",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Đăng nhập
      </Button>
    </>
  );
};

export default LoginForm;
