import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

import { UserModel } from '../models/userModel.js';
import { mailService } from './mailService.js';
import { TokenService } from './tokenServise.js';
import { UserDto } from '../dtos/userDto.js';
import { ApiError } from '../exceptions/apiErrors.js';

  async function registration(email, password) {
    const candidate = await UserModel.findOne({ email });
  
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} was exists`);
    }
  
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4(); 
  
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink
    });

    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`); 
    
    const userDto = new UserDto(user); 
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async function activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Wront activationLink')
    }

    user.isActivated = true;

    await user.save()
  }

  async function login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.NotFound();
    }

    const isPassEquels = await bcrypt.compare(password, user.password);

    if (!isPassEquels) {
      throw ApiError.BadRequest('Wrong password')
    }

    const userDto = new UserDto(user); 
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };

  }

  async function logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);

    return token;
  }

  async function refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData =  TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user); 
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async function getUsers() {
    const users = await UserModel.find();

    return users;
  }

export const userService = {
  registration,
  activate,
  login,
  logout,
  refresh,
  getUsers
};


